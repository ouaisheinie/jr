import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"
import { cleanObject } from "utils"
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const[users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: "",
		personId: ""
	})
	const [list, setList] = useState([])

	// 获取用户列表
	useEffect(() => {
		fetch(`${apiUrl}/users`).then(async res => {
			if (res.ok) {
				setUsers(await res.json())
			}
		})
	}, [])

	// 获取项目列表 或者更新
	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}, [param])

	return <div>
		<SearchPanel users={users} param={param} setParam={setParam} />
		<List users={users} list={list} />
	</div>
}