import React, { useState, useEffect } from 'react';

const Noticias = ({
    category,
    noticias,
    isLoading,
    openModal,
    categoryTitles,
    searchText,
    setSearchText,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoggedIn,
    toggleLoginModal // Función para abrir el modal de inicio de sesión
}) => {
    const [filteredNoticias, setFilteredNoticias] = useState([]);
    const [visibleNoticias, setVisibleNoticias] = useState(10);
    const [showLoginReminder, setShowLoginReminder] = useState(false);

    useEffect(() => {
        const filterBySearchAndDate = () => {
            let filtered = noticias;

            if (searchText) {
                filtered = filtered.filter(noticia =>
                    noticia.titulo.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            if (startDate) {
                filtered = filtered.filter(noticia =>
                    new Date(noticia.fecha) >= new Date(startDate)
                );
            }

            if (endDate) {
                filtered = filtered.filter(noticia =>
                    new Date(noticia.fecha) <= new Date(endDate)
                );
            }

            setFilteredNoticias(filtered);
        };

        filterBySearchAndDate();
    }, [searchText, startDate, endDate, noticias]);

    useEffect(() => {
        if (!isLoggedIn) {
            setSearchText(''); // Limpia el texto de búsqueda si el usuario no está logueado
            setStartDate(''); // Limpia la fecha de inicio
            setEndDate(''); // Limpia la fecha de fin
        }
    }, [isLoggedIn]);

    const handleLoadMore = () => {
        if (isLoggedIn) {
            setVisibleNoticias(prev => prev + 10);
        } else {
            // Desplaza la página hacia arriba y muestra un recordatorio de inicio de sesión
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowLoginReminder(true);
        }
    };

    const closeLoginReminder = (e) => {
        if (e.target === e.currentTarget) {
            setShowLoginReminder(false);
        }
    };

    return (
        <div className="flex-1 p-2 max-w-4xl mx-auto text-purple-800">
            <h1 className="text-3xl font-bold text-center mb-1 font-customFont">
                {categoryTitles[category]}
            </h1>

            {/* Modal de recordatorio para iniciar sesión */}
            {showLoginReminder && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-purple-100 z-50"
                    onClick={closeLoginReminder}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Inicia sesión</h2>
                        <p className="mb-4">Por favor, inicia sesión para ver más noticias.</p>
                    </div>
                </div>
            )}

            {/* Mostrar barra de búsqueda y filtros solo si el usuario está logueado */}
            {isLoggedIn && (
                <div className="mb-4 flex flex-col sm:flex-row gap-4 text-purple-400">
                    <input
                        type="text"
                        placeholder="Buscar noticias..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                    />
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-gray-600 p-4">Cargando noticias...</p>
            ) : filteredNoticias.length > 0 ? (
                <div>
                    {/* Mostrar la noticia principal */}
                    {filteredNoticias.length > 0 && (
                        <div
                            className="mb-2 bg-white p-2 shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                            onClick={() => openModal(filteredNoticias[0])}
                        >
                            <img src={filteredNoticias[0].image} alt={filteredNoticias[0].titulo} className="w-full h-64 object-cover" />
                            <h2 className="text-2xl font-bold mt-2">{filteredNoticias[0].titulo}</h2>
                            <p className="text-gray-700 mt-1">{filteredNoticias[0].descripcion}</p>
                        </div>
                    )}

                    {/* Mostrar las demás noticias hasta el límite visible */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredNoticias.slice(1, visibleNoticias).map((noticia, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
                                onClick={() => openModal(noticia)}
                            >
                                <img src={noticia.image} alt={noticia.titulo} className="w-full h-32 object-cover" />
                                <h3 className="font-semibold mt-2">{noticia.titulo}</h3>
                                <p className="text-gray-600 text-sm mt-1">{noticia.descripcion.slice(0, 100)}...</p>
                                <p className="text-sm text-gray-500 mt-1">
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Botón de cargar más */}
                    {visibleNoticias < filteredNoticias.length && (
                        <button
                            onClick={handleLoadMore}
                            className="mt-4 px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-500"
                        >
                            Cargar más
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-600 p-4">No se encontraron noticias.</p>
            )}
        </div>
    );
};

export default Noticias;
