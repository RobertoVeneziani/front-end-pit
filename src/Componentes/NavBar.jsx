import './NavBar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FaBars, FaCogs, FaHome, FaChevronDown, FaChevronUp, FaChevronLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function NavBar() {
    const [show, setShow] = useState(true);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [showBuscarSubmenu, setShowBuscarSubmenu] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        // Obtendo o nome do usuário do localStorage
        const storedUserName = localStorage.getItem('nome');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleShow = () => {
        setShow(!show);
    };

    const handleSubmenu = () => {
        setShowSubmenu(!showSubmenu);
    };

    const handleBuscarSubmenu = () => {
        setShowBuscarSubmenu(!showBuscarSubmenu);
    };

    const handleLogout = () => {
        // Remove o token do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('nome');

        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <>
            <div className={`side-bar ${show ? 'active-nav' : ''}`} id="sidebar">
                {/* Botão para esconder a barra lateral */}
                <button className="menu-toggle" onClick={handleShow}>
                    <FaChevronLeft />
                </button>
                <ul className="nav flex-column text-white w-100">
                    <li className="nav-link">
                        {/* Substituí "Meu Sistema" pelo nome do usuário logado */}
                        <span className="h3 text-white my-2">Olá, {userName}</span>
                    </li>
                    <li className="nav-link">
                        <Link to='/home'>
                            <FaHome />
                            <span className="mx-2" style={{ color: 'white' }}>Home</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <div onClick={handleSubmenu} style={{ cursor: 'pointer' }}>
                            <FaCogs />
                            <span className="mx-2" style={{ color: 'white' }}>Cadastrar</span>
                            {showSubmenu ? <FaChevronUp className="mx-2" /> : <FaChevronDown className="mx-2" />}
                        </div>
                        {showSubmenu && (
                            <ul className="nav flex-column text-white w-100 submenu">
                                <li className="nav-link">
                                    <Link to='/salas'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Sala</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/Horarios'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Horário</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/clientes'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Cliente</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/planos'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Plano</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/funcionario'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Funcionario</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-link">
                        <div onClick={handleBuscarSubmenu} style={{ cursor: 'pointer' }}>
                            <FaCogs />
                            <span className="mx-2" style={{ color: 'white' }}>Buscar</span>
                            {showBuscarSubmenu ? <FaChevronUp className="mx-2" /> : <FaChevronDown className="mx-2" />}
                        </div>
                        {showBuscarSubmenu && (
                            <ul className="nav flex-column text-white w-100 submenu">
                                <li className="nav-link">
                                    <Link to='/buscar/salas'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Salas</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/buscar/horarios'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Horários</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/buscar'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Clientes</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/buscar/planos'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Planos</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/buscar/funcionarios'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Funcionarios</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-link">
                        <button className="btn btn-danger w-100" onClick={handleLogout}>
                            Sair
                        </button>
                    </li>
                </ul>
            </div>
            <div className="p-1 my-container">
            </div>
            <div style={{ paddingLeft: show ? '250px' : '0' }}>
                <Container>
                    <Outlet />
                </Container>
            </div>
        </>
    );
}

export default NavBar;
