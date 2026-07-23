import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    session: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session'
        }
    ],
    refreshToken: {
        type: String
    },
    subscription: {
        plan: {
            type: String,
            enum: ["Free", "Pro", "Premium"],
            default: "Free",
        },

        status: {
            type: String,
            enum: ["Active", "Expired", "Cancelled"],
            default: "Active",
        },

        stripeCustomerId: {
            type: String,
            default: null,
        },

        stripeSubscriptionId: {
            type: String,
            default: null,
        },

        stripePriceId: {
            type: String,
            default: null,
        },

        startDate: {
            type: Date,
            default: Date.now,
        },

        endDate: {
            type: Date,
            default: null,
        },
        usage: {
            sessionsUsed: {
                type: Number,
                default: 0,
            },
            sessionsLimit: {
                type: Number,
                default: 10, 
            },
        },
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (err) {
        console.log("error in hashin password", err)
        next(err)
    }

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("user", userSchema);

export default User;