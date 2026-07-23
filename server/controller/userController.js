import jwt from 'jsonwebtoken'
import User from '../model/userModel.js';
import validator from 'validator';
import stripe from "stripe";


const stripeIns = new stripe(process.env.STRIPE_SECRETE_KEY);

const generateToken = async (user) => {

    try {
        const token = await jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        user.refreshToken = token;
        user.save({ validateBeforeSave: false });

        return token;
    }
    catch (error) {
        return error;
    }
}

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(404).json({
                message: "All fields are required!",
                success: false
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid email",
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "password should be atleast 8 characters",
            })
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return res.status(404).json({
                message: "User already exist",
                success: false
            })
        }
        const newUser = await User.create({
            username,
            email,
            password
        })

        const user = await User.findById(newUser._id).select("-password");

        if (!user) {
            return res.status(500).json({
                message: "error in creating user",
                success: false
            })
        }

        return res.status(200).json({
            message: "user created!",
            user,
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;


        if (!username || !password) {
            return res.status(404).json({
                message: "Username and password are required",
                success: false
            })
        }

        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(404).json({
                message: "Invalid username",
                success: false
            })
        }


        const PasswordCorrect = await user.isPasswordCorrect(password);

        if (!PasswordCorrect) {
            return res.status(404).json({
                message: "Incorrect password",
                success: false
            })
        }

        const token = await generateToken(user);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const option = {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        }


        return res
            .status(200)
            .cookie("refreshToken", token, option)
            .json({
                success: true,
                user: loggedInUser,
                token,
                message: "login successfully"
            })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }


}

const googleLogin = async (req, res) => {


    const googleUser = req.user;

    if (!googleUser) {
        return res.status(404).json({
            message: "Google login failed",
            success: false
        })
    }

    const email = googleUser._json.email;
    const name = googleUser.displayName;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            username: name.trim(),
            email,
            password: Math.random().toString(36)
        })
    }

    if (!user) {
        return res.status(500).json({
            message: "Error in google login",
            success: false
        })
    }
    const token = await generateToken(user);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    }

    return res
        .status(200)
        .cookie("refreshToken", token, option)
        .redirect(`${process.env.FRONTEND_URL}/oauth/success?refreshToken=${token}`)
        .json({
            success: true,
            user: loggedInUser,
            message: "Google login successful"
        })

}

const logoutUser = async (req, res) => {
    try {
        const id = req.userId;

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    refreshToken: ""
                }
            },
            {
                new: true
            })


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const option = {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        }


        return res
            .status(200)
            .clearCookie("refreshToken", option)
            .json({
                success: true,
                message: "user successfully logout!!"
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "authorizes user"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const Userinfo = async (req, res) => {
    try {
        const id = req.userId;

        const user = await User.findById(id).select("-password -refreshToken");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const upgradeSubscription = async (req, res) => {
    try {
        const { priceId } = req.body;

        if (!priceId) {
            return res.status(404).json({
                success: false,
                message: "priceId required ! "
            })
        }

        const session = await stripeIns.checkout.sessions.create({
            mode: "subscription",

            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],

            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,

            client_reference_id: req.userId.toString(),   // user id
        });


        return res.status(200).json({
            success: true,
            message: "session created successfully!",
            sessionUrl: session.url
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
}

const updatePlan = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID required"
            });
        }

        const session = await stripeIns.checkout.sessions.retrieve(sessionId);

        // Verify payment
        if (session.payment_status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed"
            });
        }


        const subscription = await stripeIns.subscriptions.retrieve(
            session.subscription
        );


        const priceId = subscription.items.data[0].price.id;

        const startDate = new Date(subscription.start_date * 1000);

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        console.log("start : ",startDate)
        console.log("end : ",endDate)

        let plan = "Free";

        if (priceId === process.env.PRO_PRICE_ID)
            plan = "Pro";

        if (priceId === process.env.PREMIUM_PRICE_ID)
            plan = "Premium";

        await User.findByIdAndUpdate(req.userId, {
            subscription: {
                plan,
                status: "Active",
                stripeCustomerId: session.customer,
                stripeSubscriptionId: session.subscription,
                stripePriceId: priceId,
                startDate,
                endDate,
                usage: {
                    sessionsLimit: plan == 'Pro' ? 100 : plan == 'Premium' ? 500 : 10,
                    sessionsUsed: 0
                }
            },
        });

        return res.status(200).json({
            success: true,
            message: "Subscription updated successfully."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};



export { registerUser, loginUser, googleLogin, logoutUser, checkAuth, Userinfo, upgradeSubscription, updatePlan };