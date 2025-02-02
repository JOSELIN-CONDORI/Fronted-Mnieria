import React, { useEffect, useState } from 'react';

const NoticiasMasLeidas = () => {
    const [masLeidas, setMasLeidas] = useState([]);

    useEffect(() => {
        const fetchMasLeidas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/noticias-mas-leidas');
                const data = await response.json();
                setMasLeidas(data);
            } catch (error) {
                console.error('Error al obtener las noticias más leídas:', error);
            }
        };

        fetchMasLeidas();
    }, []);

    return (
        <div className="mt-6">
            <h2 className="text-xl mb-6 text-purple-800">Noticias Concurridas</h2>
            <ul>
                {masLeidas.map((noticia, index) => (
                    <li key={index} className="mb-4 flex">
                        <img src={noticia.image} alt={noticia.titulo} className="w-32 h-32 object-cover mr-4" />
                        <div>
                            <h3 className="text-lg font-medium">{noticia.titulo}</h3>
                            <p className="text-sm text-gray-500">Vistas: {noticia.views}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticiasMasLeidas;
