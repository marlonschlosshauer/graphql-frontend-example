import { useEffect, useState } from "react";

async function fetchq(text, variables) {
	const response = await fetch('http://localhost:5000/q', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ query: text, variables })
	});
	return await response.json();
}

const usersQuery = `
query {
  users {
    id
  }
}
`;

const App = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchq(usersQuery).then(r => setUsers(r.data?.users));
	}, []);

	return (
		<div>
			<h3>Users:</h3>
			<ul>
				{users.map(u => (<li key={ u.id }>{JSON.stringify(u)}</li>))}
			</ul>
		</div>
	);
};

export default App;
