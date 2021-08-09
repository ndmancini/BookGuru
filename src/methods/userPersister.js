const userPersister = () => {
    const storageUser = JSON.parse(localStorage.getItem("user")) || {};
    return storageUser
}

export default userPersister;