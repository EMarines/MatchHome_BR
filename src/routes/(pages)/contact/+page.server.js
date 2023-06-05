import { fail } from '@sveltejs/kit'
import { object, string, number, date, InferType } from 'yup';

export const actions = {
    default: async({request}) => {
        const formData = await request.formData();
        const name = formData.get("name")
        const email = formData.get("email")
        const message = formData.get("message")

        const contactFormSchema = object({
            name: string().min(2, "mínimo 2 caracteres").required("Nombre requerido"),
            email: string().required().email(),
            message: string().required(),
        });

        try {
            const result = await contactFormSchema.validate({ name, email, message}, {abortEarly: false});
            console.log(result);

            const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSctUvZKp1UdifRfj9Tt3u7vsanQaGenfqA-megcC7p7KnzmqA/formResponse?usp=pp_url&entry.554792136=${name}&entry.287910186=${email}&entry.909898343=${message}&submit=Submit`;

            const res = await fetch(prefilledLink)
          
            return {
                success: true,
                status: "Form is submitted",
            };
            
        } catch (error) {
            console.log({error});
            const errors = error.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };

            }, {});

            return{
                errors,
                name,
                email,
                message,
            }
        }

    
    },
}