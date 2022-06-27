const sizeOfArray = 4
const arrays = {
	A: [],
	B: [],
	C: [],
	D: []
}


function initArray(arr, name) {
	for (let i = 0; i < sizeOfArray - 1; i++)
		arr.push(`${name}${i + 1}`)
	arr.push(`${name}${name.toLowerCase()}`)
}

function flat(arr){
    return [].concat(...arr)
}

function run() {
	for (let name in arrays)
		initArray(arrays[name], name)

	const { A, ...arrs } = arrays
	const arrNames = Object.keys(arrs)
	const number = arrNames.length
	let result = []
	let temp = [...arrs[arrNames[0]]]

	temp.forEach(e => {
		let res = []
		let curr = [e]
		let Final = [...arrs[arrNames[number - 1]]]
		while (Final.length > 0) {
			curr.push(Final.shift())
			res.push([...curr])
			curr.pop()
		}
		result.push(res)
	})

	for (let i = number - 2; i > 0; i--) {
		let res = [...result];
		result.length = 0;
		temp = [...arrs[arrNames[i]]]
		while (temp.length > 0) {
			let first = temp.shift();
			let curr = Array.prototype.flat ? curr.flat() : flat(res)
			curr.forEach(_ => _.push(first))
			result.push(JSON.parse(JSON.stringify(curr)))
			curr.forEach(_ => _.pop())
		}
	}

	res = [...result];
	result.length = 0;
	temp = [...A]
	while (temp.length > 0) {
		let first = temp.shift();
		let curr = Array.prototype.flat ? curr.flat() : flat(res)
		curr.forEach(_ => {
			_.push(first)
			_.sort()
		})
		result.push(JSON.parse(JSON.stringify(curr)))
		curr.forEach(_ => _.shift())
	}

	console.log(result)
}

run();