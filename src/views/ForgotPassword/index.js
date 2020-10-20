import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../services/usersService';
import Button from '../../components/Button';
import '../../index.css'
import './style.scss';

function ForgotPassword() {

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = forgotPassword

    return (
        <>
        <div className="recovery">
            <div className="recovery__form">
                <h1>Recuperar senha</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>e-mail</p>
                    <input
                        type="text"
                        name="email"
                        placeholder="email@email.com"
                        ref={register({
                            required: "campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "email inválido"
                            }
                        })}
                    />
                    {errors.email && <span className="danger">{errors.email.message}</span>}
                    <Button small>RECUPERAR</Button>
                    <p>Já tem login e senha? <Link to="/login">Entrar</Link></p>
                </form>
            </div>
        </div>
        </>
    );
}

export default ForgotPassword;