import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../assets/data/Interfaces";
import { UserActionType } from "../assets/data/Types";
import { UserContext } from "../contexts/UserContext";
import SignInModal from "./SignInModal";

const NavBar = () => {
	const NAME_CONST_KEYWORD = "Bramh";
	const userContext = useContext(UserContext);
	const [playerData, setPlayerData] = useState<UserState>({
		uid: null,
		displayName: "",
		photoURL: "",
		providerId: null,
	});
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	const assignNameAndUid = (displayName?: string): UserState => {
		if (!userContext) return playerData;
		const dt = new Date();
		let randomString =
			dt.getSeconds().toString() +
			dt.getMilliseconds().toString() +
			Math.random().toString(36).substring(2, 5);
		let tempName = "";
		if ((displayName && displayName.length < 4) || !displayName) {
			displayName = NAME_CONST_KEYWORD;
		}
		tempName = displayName + "-" + randomString;
		if (displayName == NAME_CONST_KEYWORD) displayName = tempName;
		let uid =
			tempName.replaceAll(" ", "").toLowerCase() +
			Math.random().toString(36).substring(1, 10);
		return { ...userContext.data, uid, displayName };
	};

	const updateNameAndUid = () => {
		let displayName = playerData.displayName;
		if (userContext && displayName !== userContext.data.displayName) {
			let newData = assignNameAndUid(displayName);
			userContext.authUser(UserActionType.UPDATE, newData);
		}
	};

	useEffect(() => {
		if (!userContext) return;
		if (userContext.data.uid) {
			return;
		}
		let playerLocalData = localStorage.getItem("playerData");
		if (playerLocalData) {
			let playerLocalDataJson = JSON.parse(playerLocalData);
			if (playerLocalDataJson.uid) {
				let newData = { ...userContext.data, ...playerLocalDataJson };
				userContext.authUser(UserActionType.UPDATE, newData);
				return;
			}
		}
		let newData = assignNameAndUid();
		userContext.authUser(UserActionType.UPDATE, newData);
	}, []);

	useEffect(() => {
		if (userContext && userContext.data.uid) {
			if (userContext.data.providerId != null) setIsUserLoggedIn(true);
			setPlayerData(userContext.data);
		} else {
			setIsUserLoggedIn(false);
		}
	}, [userContext]);

	useEffect(() => {
		if (
			!playerData.uid ||
			document.querySelector("#user_name") == document.activeElement
		)
			return;
		localStorage.setItem("playerData", JSON.stringify({ ...playerData }));
	}, [playerData]);

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<SignInModal
				isModalOpen={modalOpen && !isUserLoggedIn}
				updateModalState={(stateArg: boolean) => setModalOpen(stateArg)}
			/>
			<div className="absolute top-5 left-10">
				<div className="flex flex-row justify-center items-center cursor-pointer">
					<div
						className="h-20 w-20 rounded-full overflow-hidden bg-white/50 flex justify-center hover:scale-105 transition-all"
						onClick={() => setModalOpen(true)}
					>
						<img
							className={`${
								isUserLoggedIn
									? "h-20 hover:translate-y-2"
									: "h-32 hover:-translate-y-2"
							} hover:h-25 transition-all `}
							src={playerData.photoURL}
						/>
					</div>
					<input
						id="user_name"
						className="ml-2 text-white bg-transparent max-w-sm"
						style={{
							width: `${playerData.displayName.length + 2}ch`,
						}}
						disabled={isUserLoggedIn ? true : false}
						value={playerData.displayName || ""}
						onChange={(e) => {
							if (isUserLoggedIn) return;
							let name = e.target.value;
							if (name.length < 25)
								setPlayerData({
									...playerData,
									displayName: name,
								});
						}}
						onBlur={() => {
							if (isUserLoggedIn) return;
							updateNameAndUid();
						}}
						onKeyDown={(e) => {
							if (isUserLoggedIn) return;
							if (e.keyCode === 13) {
								updateNameAndUid();
								e.currentTarget.blur();
							}
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default NavBar;
