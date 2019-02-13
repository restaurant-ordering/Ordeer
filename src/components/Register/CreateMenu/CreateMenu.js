import React, {useState} from 'react';
import MenuForm from '../../Forms/MenuForm/MenuForm';

const CreateMenu = props => {

	const [menu, updateMenu] = useState({})

	console.log(menu)
	
	return (
		<>
			<MenuForm updateMenu={updateMenu}/>
		</>
	)
}

export default CreateMenu;