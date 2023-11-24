// 小驼峰->大驼峰
const camelToPascal = (camelCase: string) => {
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);;
}

// 小驼峰->连字符
const sCamelToKebab = (str: string, separator: string) => {
    return str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();
};
// 小驼峰->常量
const camelToConstantCase = (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
};

// 大驼峰->小驼峰
const pascalToCamel = (pascalCase: string) => {
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}

// 连字符->小驼峰
const toCamelCase = (str: string) => {
    return str.replace(/[-_](.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}

// 常量->小驼峰
const constantToLowerCamelCase = (str: string) => {
    return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

// 大驼峰->连字符 
const bCamelToKebab = (str: string, separator: string) => {
    return str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();
};

// 连字符->大驼峰
const toUpperCamelCase = (str: string) => {
    const words = str.split(/[-_]/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join("");
}

const btns = [
	{
		id: '1',
		label: '小驼峰2Other',
		list: [
			{
				label: '小驼峰2大驼峰',
				fn: camelToPascal,
			},
			{
				label: '小驼峰2连字符',
				fn: sCamelToKebab,
			},
			{
				label: '小驼峰2常量',
				fn: camelToConstantCase,
			},
		]
	},
	{
		id: '2',
		label: 'Other2小驼峰',
		list: [
			{
				label: '大驼峰2小驼峰',
				fn: pascalToCamel,
			},
			{
				label: '连字符2小驼峰',
				fn: toCamelCase,
			},
			{
				label: '常量2小驼峰',
				fn: constantToLowerCamelCase,
			},
		]
	}
]

export {
    bCamelToKebab, btns, camelToConstantCase, camelToPascal, constantToLowerCamelCase, pascalToCamel, sCamelToKebab,
    toCamelCase,
    toUpperCamelCase
};

