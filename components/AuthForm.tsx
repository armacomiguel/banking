"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from './CustomInput';
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';


const AuthForm = ({type}:{type: string}) => {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
       try {

        if(type === "sign-up"){
            const newUser = await signUp(data);
            setUser(newUser);
        }

        if(type === "sign-in"){
            const response = await signIn({
                email: data.email,
                password: data.password,
            });

            if(response) router.push("/")
        }
        
       } catch (error) {
        console.log(error);
       }
       finally {
        setIsLoading(false);
       }
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer flex items-center gap-1'>
                <Image src="/icons/logo.svg" width={36} height={36} alt='Horizon logo' />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Registro con éxito!' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Ahora puedes empezar.' : 'Please enter your details'}
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* padlink */}
            </div>
        ): (
            <>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {type === "sign-up" && (
                         <>
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} 
                                    name="firstName" label="Nombre" 
                                    placeholder='Ingresa tu nombre'
                                    />
                                <CustomInput control={form.control} 
                                    name="lastName" label="Apellido" 
                                    placeholder='Ingresa tu apellido'
                                />
                            </div>
                            <CustomInput control={form.control} 
                                name="address1" label="Dirección" 
                                placeholder='Ingresa tu dirección'
                            />
                            <CustomInput control={form.control} 
                                name="city" label="Ciudad" 
                                placeholder='Ingresa tu ciudad'
                            />
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} 
                                    name="state" label="Estado" 
                                    placeholder='Ingresa tu estado'
                                    />
                                <CustomInput control={form.control} 
                                    name="postalCode" label="Codigo Postal" 
                                    placeholder='Ingresa tu codigo postal'
                                />
                            </div>
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} 
                                    name="dateOfBirth" label="Fecha de nacimiento" 
                                    placeholder='Ingresa tu fecha de nacimiento'
                                />
                                <CustomInput control={form.control} 
                                    name="ssn" label="NSS" 
                                    placeholder='Ingresa tu número de seguro social'
                                />
                            </div>
                        </>
                    )}

                    <CustomInput control={form.control} 
                        name="email" label="Correo" placeholder='Ingresa tu correo.'
                    />

                    <CustomInput control={form.control} 
                        name="password" label="Contraseña" placeholder='Ingresa tu contraseña.'
                    />

                    <div className='flex flex-col gap-4'>
                        <Button className='form-btn' type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                <Loader2 size={20} className='animate-spin'/> &nbsp; Cargando...
                                </>
                            ) : type === "sign-in" ? "Iniciar Sesión" : "Registro"}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in' ? '¿No tienes una cuenta? ':'Tengo una cuenta, '}
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                        {type === 'sign-in' ? 'Registrate' : 'Iniciar Sesión'}
                    </Link>
                </p>

            </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm;