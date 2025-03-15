function Profile() {
    const name_1 = localStorage.getItem("name_1")
    const name_2 = localStorage.getItem("name_2")

    return (
    <div>
        welcome {name_1} {name_2}
    </div>
  )
}

export default Profile