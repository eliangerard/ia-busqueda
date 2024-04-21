/*
Integrantes
Arturo Misael Álvarez Gutiérrez 	20550369
Adrián Corral Quezada				20550363
Elian Ramiro Gerard Ramos			20550362
Jesús Adán Salazar Campos			20550365
*/
import { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'

let currentBone = 0
let currentPos = 1
let found = false
let checkedBones = 0
let pastCheckedBones = 0
let move = 1
let tick = 0
let pastBone = currentBone
let pastPos = currentPos
let timer;

function App() {

	const [map, setMap] = useState([...Array(6).fill([0, 0, 0])]);
	const [start, setStart] = useState(false);

	useEffect(() => {
		initializeMap();
	}, []);

	useEffect(() => {
		timer = setTimeout(() => {
			moveDog();
		}, 1000);

		return () => clearTimeout(timer);
	}, [map]);

	const initializeMap = () => {
		const bone = Math.round(Math.random() * (4 - 1)) + 1;
		const left = Math.round(Math.random());
		setMap((oldMap) => {
			const newMap = oldMap.map((row) => [0, 0, 0]);

			console.log(newMap);
			newMap[bone][left ? 0 : 2] = 1;
			newMap[0][1] = 2;
			console.table(newMap);
			return newMap;
		})
	}
	const moveDog = () => {
		if (currentBone < 5 && currentBone >= 0) {
			if (!found) {
				pastBone = currentBone
				pastPos = currentPos
				pastCheckedBones = checkedBones
				if (checkedBones == 4) {
					move = -1
					tick = 0
				}
				if (currentPos == 0 || currentPos == 2) {
					checkedBones++
				}
				if (currentPos == 1 && currentBone != 0 && tick == 0) {
					currentPos -= move
					tick++
				} else {
					currentPos = 1
					tick++
				}
				if (currentBone == 0 || tick >= 3) {
					currentBone += move
					tick = 0
				}
				if (map[currentBone][currentPos] == 1) {
					found = true;
					console.log('Encontrado')
				}
				console.log(currentBone, currentPos)
				map[pastBone][pastPos] = 0
				map[currentBone][currentPos] = found ? 3 : 2;
				setMap([...map])
			}
			else {
				move = 1
				pastBone = currentBone
				pastPos = currentPos
				if (tick >= 3) {
					currentBone += move
					tick = 0
				} else if (currentPos == 1) {
					currentBone += move
				} else {
					currentPos = 1
					tick++
				}
				map[pastBone][pastPos] = 0
				map[currentBone][currentPos] = found ? 3 : 2;
				setMap([...map])
			}
		}
	}


	return (
		<>
			<h1 className='text-3xl text-white font-bold w-10/12 text-left p-4'>Práctica 3.1</h1>
			<div className='h-2/3 py-16 bg-[#1E1E1E] w-10/12 rounded-3xl flex items-center justify-center'>
				<div className='relative h-full w-10/12 flex justify-between items-center'>
					<div className='absolute bg-[#494949] w-full h-6 z-0 px-4 rounded-full'></div>
					<div className='absolute z-10 w-full h-full flex flex-row-reverse justify-between items-center'>
						{
							map.map((row, i) => {
								if (i == 0)
									return (<div className='rounded-full h-14 w-14 -left-2 bg-gray-300 flex items-center justify-center'>
										{row[1] === 2 && <p className='text-4xl'>🐶</p>}
									</div>)

								if (i == map.length - 1)
									return (<div className='relative rounded-full h-14 w-14 -left-2 bg-yellow-300 flex items-center justify-center'>
										{row[1] === 2 && <p className='text-4xl'>🐶</p>}
										{row[1] === 3 && <div className='relative h-6 w-full'>
											<p className='absolute text-center text-4xl top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2'>🐶</p>
											<p className='absolute text-center top-full left-1/2 -translate-y-1/2 -translate-x-1/2'>🥎</p>
										</div>}
										{(map[map.length - 1][1] == 3) && 
										<div className='absolute z-10 w-full h-full flex items-center justify-center'>
											<ConfettiExplosion {...{
												force: 0.4,
												duration: 2200,
												particleCount: 30,
												width: 400,
											}} colors={["#6CA523", "#986A3F", "FDE047", "#EEEEEE"]} />
										</div>
										}
									</div>)

								return (
									<div className='flex flex-col h-full'>
										{
											row.map((cell, cellIndex) =>
											(<div className={`relative h-1/3 w-6 bg-[#494949] flex ${cellIndex == 0 ? 'flex-col items-center' : cellIndex == 1 ? "items-center justify-center" : cellIndex == 2 ? 'flex-col-reverse items-center' : ''}`}>
												{cell === 1 && <p>🥎</p>}
												{cell === 2 && <p className='text-4xl'>🐶</p>}
												{cell === 3 && <div className='relative h-6 w-full'>
													<p className='absolute text-center text-4xl top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2'>🐶</p>
													<p className='absolute text-center top-full left-1/2 -translate-y-1/2 -translate-x-1/2'>🥎</p>
												</div>}
												{(cellIndex == 0 || cellIndex == 2) &&
													<div className={`absolute ${cellIndex == 0 ? '-top-4' : 'bottom-4'} -z-10 h-fit w-10`}>
														<div className='relative flex'>
															<div className='absolute -left-1 rounded-full bg-[#494949] h-8 w-8'></div>
															<div className='absolute -right-1 rounded-full bg-[#494949] h-8 w-8'></div>
														</div>
													</div>
												}
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
			<div className='flex w-full justify-center mt-4'>
				<button className='w-48 py-2 px-4 mr-4 bg-zinc-700 rounded-full text-white font-bold'
					onClick={() => {
						clearTimeout(timer);
						currentBone = 0
						currentPos = 1
						found = false
						checkedBones = 0
						pastCheckedBones = 0
						move = 1
						tick = 0
						pastBone = currentBone
						pastPos = currentPos
						initializeMap();
					}}
				>Reiniciar</button>
			</div>
		</>
	)
}

export default App
