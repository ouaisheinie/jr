
export const SearchPanel = props => {
	const {
		param,
		setParam,
		personId,
		setPersonId,
		users
	} = props

	return <form action="">
		<div>
			<input type="text" value={ param.name } onChange={event => setParam({
				...param,
				name: event.target.value
			})}/>
			<select value={ personId} onChange={event => setPersonId(event.target.value)}>
				{
					users.map(user => <option value={ user.id } key={user.id}>{ user.name }</option>)
				}
			</select>
		</div>
	</form>
}