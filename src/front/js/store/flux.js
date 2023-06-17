const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			authToken: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });

			},
			login: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ authToken: data.authToken });
					}
				} catch (error) {
					console.error(error)
				}
				return false;
			},
			signup: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (response.ok) {
						const data = await response.json();
						return true; 
					} else {
						console.error("Signup failed");
					}
				} catch (error) {
					console.error(error);
				}
				return false;
			}

		}
	};
};

export default getState;
