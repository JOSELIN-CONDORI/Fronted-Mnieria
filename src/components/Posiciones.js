import React from 'react';
import NoticiasMasLeidas from './NoticiasMasLeidas'; // Importa el componente de NoticiasMásLeídas

const Posiciones = ({ posiciones }) => {
    return (
        <div className="text-center w-1/3 p-2 pr-24">
            <h2 className="text-xl font-bold mb-4 text-purple-900 ">Tabla de Posiciones</h2>
            {posiciones.length > 0 ? (
                <table className="bg-white w-full rounded-lg shadow-md mb-4">
                    <thead>
                        <tr className="bg-purple-900 text-white">
                            
                            <th className="p-3 text-left border border-gray-300">POS</th>
                            <th className="p-3 text-left border border-gray-300">Equipo</th>
                            <th className="p-3 text-left border border-gray-300">J</th>
                            <th className="p-3 text-left border border-gray-300">V</th>
                            <th className="p-3 text-left border border-gray-300">E</th>
                            <th className="p-3 text-left border border-gray-300">D</th>
                            <th className="p-3 text-left border border-gray-300">DG</th>
                            <th className="p-3 text-left border border-gray-300">PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posiciones.map((posicion, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2 border border-gray-300 text-center">{posicion.posicion}</td>
                                <td className="p-6 flex items-center border border-gray-300 text-center">
                                    <img src={posicion.bandera_url} alt={posicion.equipo} className="w-5 h-5 mr-2" />
                                    {posicion.equipo}
                                </td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.jugados}</td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.victoria}</td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.empate}</td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.derrota}</td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.diferencia_goles}</td>
                                <td className="p-2 border border-gray-300 text-center">{posicion.puntos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No se encontraron posiciones.</p>
            )}

            {/* Sección de Noticias Más Leídas */}
            <NoticiasMasLeidas />
        </div>
    );
};

export default Posiciones;