import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Protected = () => {


	return (
		<div className="text-center mt-5">
			<h1>this is a protected page</h1>
			
			<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/306/013/231.png" />
			
		</div>
	);
};
