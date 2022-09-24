
export const SearchPanel = props => {
	const {
		param,
		setParam,
		users
	} = props

	return <form action="">
		<div>
			<input type="text" value={ param.name } onChange={event => setParam({
				...param,
				name: event.target.value
			})}/>
			<select value={ param.personId} onChange={event => setParam({
				...param,
				personId: event.target.value
			})}>
				{
					users.map(user => <option value={ user.id } key={user.id}>{ user.name }</option>)
				}
			</select>
		</div>
	</form>
}