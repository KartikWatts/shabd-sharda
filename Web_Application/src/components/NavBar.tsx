import React, { useEffect, useState } from "react";
import bramhan from "../assets/images/bramhan.png";
import SignInModal from "./SignInModal";

const NavBar = () => {
	const [playerName, setPlayerName] = useState("Bramh");
	useEffect(() => {
		const dt = new Date();
		setPlayerName(
			"Bramh-" +
				dt.getSeconds().toString() +
				dt.getMilliseconds().toString() +
				Math.random().toString(36).substring(2, 5)
		);
	}, []);
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<SignInModal
				isModalOpen={modalOpen}
				updateModalState={(stateArg: boolean) => setModalOpen(stateArg)}
			/>
			<div className="absolute top-5 left-10">
				<div
					className="flex flex-row justify-center items-center cursor-pointer"
					onClick={() => setModalOpen(true)}
				>
					<div className="h-20 w-20 rounded-full overflow-hidden bg-white/50 flex justify-center hover:scale-105 transition-all">
						<img
							className="h-32  hover:h-25 transition-all hover:-translate-y-2"
							src={bramhan}
						/>
					</div>
					<span className="ml-2 text-white">{playerName}</span>
				</div>
			</div>
		</>
	);
};

export default NavBar;
