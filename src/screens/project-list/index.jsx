import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"
import { cleanObject } from "utils"
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const[users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: "", // 项目名称
		id: "",
	})
	const debouncedParam = useDebounce(param, 1000)
	const [personId, setPersonId] = useState("")
	const [list, setList] = useState([])

	const fetchProjectList = (param = {}) => {
		const newParam = {
			...param,
			personId
		}
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(newParam))}`).then(async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}
	
	// 获取项目列表 或者更新
	useEffect(() => {
		fetchProjectList(debouncedParam)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedParam, personId]) // personId不会在 useDebounce 里面触发setTimeout 于是就直接执行

	useMount(() => {
		// 获取用户列表
		fetch(`${apiUrl}/users`).then(async res => {
			if (res.ok) {
				setUsers(await res.json())
			}
		})
	})

	return <div>
		<SearchPanel users={users} personId={personId} setPersonId={setPersonId} param={param} setParam={setParam} />
		<List users={users} list={list} />
	</div>
}

// customhook
export const useMount = (callback) => {
	useEffect(() => {
		callback()
	}, [])
}

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// 每次value变化以后 设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		// 每次在上一个useEffect被清理的时候运行，相当于上一次useEffect被下次替换，就卸载了，这个return就是在useEffect卸载的时候执行。
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}