const generateAvatar = (email:string,name:string) => {
    return `https://www.gravatar.com/avatar/${email}?d=https://ui-avatars.com/api/${name}/128/random`
}
export default generateAvatar