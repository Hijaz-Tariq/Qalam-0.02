// import * as React from "react"



// import { Input } from "./input"
// import { Smartphone, MailIcon } from "lucide-react"




// export interface TelInputProps
//     extends React.InputHTMLAttributes<HTMLInputElement> {
// }


// const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
//     ({ className, ...props }, ref) => {

//         const [showTel, setShowTel] = React.useState(false);
        
//         return (

//             <Input type={showTel ? "number" : "string"} placeholder={showTel ? "0123456789" : ""} suffix={showTel ? (<MailIcon className="select-none" onClick={() => setShowTel(false)} />) : (<Smartphone className="select-none" onClick={() => setShowTel(true)} />)} className={className} {...props} ref={ref}
//             />
            
//         )
//     }
// )
// TelInput.displayName = "TelInput"

// export { TelInput }



import * as React from "react";
import { Input } from "./input";
import { Smartphone, MailIcon } from "lucide-react";
import { emailOrPhone } from "@/lib/utils"; // Import the emailOrPhone utility function

export interface TelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
    ({ className, ...props }, ref) => {
        const [inputValue, setInputValue] = React.useState<string>("");

        // Determine the type of input (email or phone number)
        const inputType = emailOrPhone(inputValue);

        // Update the input value as the user types
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        };

        return (
            <Input
                type={inputType === 'email' ? "email" : "tel"}  // Conditionally set the input type to email or tel
                placeholder={inputType === 'phone' ? "Enter phone number" : "Enter email address"}
                suffix={
                    inputType === 'phone' ? (
                        <MailIcon className="select-none" onClick={() => setInputValue("")} />
                    ) : (
                        <Smartphone className="select-none" onClick={() => setInputValue("")} />
                    )
                }
                className={className}
                value={inputValue}
                onChange={handleInputChange}
                ref={ref}
                {...props}
            />
        );
    }
);

TelInput.displayName = "TelInput";

export { TelInput };
