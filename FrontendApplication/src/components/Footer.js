

const Footer = () => {

    const currentYear = new Date().getFullYear();
    const brandName = "NexusBank";

    return (
        <footer className="footer">
            <p>&copy; {currentYear} {brandName}. All Rights Reserved.</p>
            <p>This project is associated to MCA Final Year Capstone Project in Jain (Deemed-to-be-University). Made with ❤ By Namnika Janbandhu</p>
        </footer>
    )
}

export default Footer