import { TriangleDownIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Divider,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";

export const Navbar  = () => {
	const history = useHistory();

	const context = useContext(UserContext);

	const goHome = () => {
		history.push("/");
	};

	// const goToSnake = () => {
	// 	history.push("/snake");
	// };

	// const goToSudoku = () => {
	// 	history.push("/sudoku");
	// };

	// const goToInventory = () => {
	// 	history.push("/inventory");
	// };

	// const goToShop = () => {
	// 	history.push("/shop");
	// };

	const handleLogout = () => {
		context?.logOut();
		history.push("/");
	};
	return (
		<Flex
			bgGradient="linear-gradient(180deg, rgb(21, 73, 60) 0%, rgba(20,99,89,1) 100%)"
			width="100vw"
			height="60px"
			borderBottom="2px solid black"
			justifyContent="space-between"
			alignItems="center">
			<Flex>
				<Button variant="link" mx={2} onClick={goHome}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="white"
						alignSelf="center">
						HOME
					</Text>
				</Button>

				{/* <Button variant="link" mx={2} onClick={goToSudoku}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="white"
						alignSelf="center">
						SUDOKU
					</Text>
				</Button>

				<Button variant="link" mx={2} onClick={goToSnake}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="white"
						alignSelf="center">
						SNAKE
					</Text>
				</Button>

				<Button variant="link" mx={2} onClick={goToInventory}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="white"
						alignSelf="center">
						INVENTORY
					</Text>
				</Button>

				<Button variant="link" mx={2} onClick={goToShop}>
					<Text
						fontSize="24"
						fontWeight="bold"
						color="white"
						alignSelf="center">
						SHOP
					</Text>
				</Button> */}
			</Flex>

			{/* <Menu>
				<MenuButton as={Button} mx={6}>
					{
		
						context?.userInfo?.userName
					}

					<TriangleDownIcon height="14px" ml={2} />
				</MenuButton>

				<MenuList>
					<Flex width="100%" alignItems="center" direction="column">
						<Avatar
							size="lg"
							py={3}
							name={
								
								context.userInfo.userName
							}
							src={
								//@ts-ignore
								context.userInfo.profilePicture
							}
						/>

						<Text fontWeight="bold" fontSize="18px" my={3}>
							{
								//@ts-ignore
								context.userInfo.userName
							}
						</Text>

						<Text fontSize="18px" my={3}>
							Coins:{" "}
							{
								//@ts-ignore
								parseInt(context.userInfo.balance)
							}
						</Text>

						<Divider />

						<MenuItem>
							<Text
								fontSize="18px"
								width="100%"
								display="flex"
								justifyContent="center"
								onClick={handleLogout}>
								Log out
							</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu> */}
		</Flex>
	);
};