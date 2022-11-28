import React, {useState, useEffect} from 'react'
import './style.css'
import { Card } from '../../components/Card'

export function Home() {
	
	const [studentName, setStudentName] = useState<string>('Ex: Gabriel');
	const [students, setStudents] = useState<User[]>([]);
	const [user, setUser] = useState({name: '', avatar: ''})

	function handleAddStudent() {
		const newStudent: User = {
			name: studentName,
			time: new Date().toLocaleTimeString("pt-br", {
				hour: "2-digit",
       			minute: "2-digit",
       			second: "2-digit"
			})
		};
		setStudents(prevState => [...prevState, newStudent])
	}

	useEffect(() => {
		//body - execução após renderização
		// fetch("https://api.github.com/users/guilhermejackson")
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		console.log(data)
		// 		setUser({
		// 			name: data.name,
		// 			avatar: data.avatar_url
		// 		})
		// 	})

		async function fetchData() {
			const response = await fetch("https://api.github.com/users/guilhermejackson");
			const data = await response.json();
			console.log("DADOS =>", data);
		
			setUser({
			  name: data.name,
			  avatar: data.avatar_url,
			});
		}
		fetchData()
	}, []);

	return (
		<div className="container">
			<header>
				<h1>Lista de presença: {studentName}</h1>
				<div>
					<strong>{user.name}</strong>
					<img src={user.avatar} alt="Foto de perfil"></img>
				</div>
			</header>
			
			<input
				type="text"
				placeholder="Digite o nome..."
				onChange={e => setStudentName(e.target.value)}
			></input>
			<button type="button" onClick={handleAddStudent}>Adicionar</button>
			{
				students.map(student => {
					return <Card key={student.time} name={student.name} time={student.time} />
				})
				
			}
		</div>
	)
}

export default Home

export interface User {
	name: string,
	time: string
}