import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const cargarPage = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/3';

      const response = await fetch(url);
      console.log({ response });
      if (!response.ok) {
        throw new Error('Error en la llamada a la API');
      }
      const data = await response.json();
      console.log({ data });
      setData(data);
    } catch (error) {
      setIsError(true);
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    cargarPage();
  }, []);

  if (isLoading) return <h1>Cargando...</h1>;

  if (isError) return <h1>Hubo un error</h1>;

  return (
    <>
      <h1>
        {data?.name} - {data?.id}
      </h1>
      <img
        style={{ width: '25rem', height: '25rem' }}
        src={data?.sprites?.other['official-artwork'].front_default}
        alt={data?.name}
      />
    </>
  );
}

export default App;
