import { useEffect, useState } from 'react'


function App() {

	const [map, setMap] = useState([...Array(6).fill([0, 0, 0])]);

	useEffect(() => {
		initializeMap();
	}, []);

	const initializeMap = () => {
		const bone = Math.round(Math.random() * (4 - 1)) + 1;
		const left = Math.round(Math.random());
		console.log(bone, left == 1);
		setMap((oldMap) => {
			console.log(oldMap);
			const newMap = oldMap.map((row) => [0, 0, 0]);

			console.log(newMap);
			newMap[bone][left ? 0 : 2] = 1;
			newMap[0][1] = 2;
			console.table(newMap);
			return newMap;
		})
		
		setInterval(() => {
			
		}, 2000);
	}

	return (
		<>
			<h1 className='text-3xl text-white font-bold w-10/12 text-left p-4'>Práctica 3.1</h1>
			<div className='h-2/3 py-6 bg-[#1E1E1E] w-10/12 rounded-2xl flex items-center justify-center'>
				<div className='relative h-full w-10/12 flex justify-between items-center'>
					<div className='absolute bg-[#494949] w-full h-6 z-0 px-4'></div>
					<div className='absolute z-10 w-full h-full flex flex-row-reverse justify-between items-center'>
						{
							map.map((row, i) => {
								if (i == 0 || i == map.length - 1)
									return (<div className='rounded-full h-14 w-14 bg-gray-300 flex items-center justify-center'>
										{row[1] && <p className='text-4xl'>🐶</p>}
									</div>)

								return (
									<div className='flex flex-col h-full'>
										{
											row.map((cell, cellIndex) =>
											(<div className={`h-1/3 w-6 bg-[#494949] flex ${cellIndex == 0 ? 'flex-col' : cellIndex == 2 ? 'flex-col-reverse' : ''}`}>
												{cell === 1 && <p>🥎</p>}
												{cell === 2 && <p className='text-4xl'>🐶</p>}
											</div>)
											)
										}
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
			<div className='flex'>
				<button>Reiniciar</button>
				<button>Iniciar</button>
			</div>
		</>
	)
}

export default App
