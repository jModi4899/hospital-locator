import React, { useState } from "react"
import "../App.css"

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleNavbar = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<a href="/" className="navbar-logo">
					Hospital Locator
				</a>
			</div>
			<ul className={`navbar-links ${isOpen ? "active" : ""}`}>
				<li>
					<a href="/" className="navbar-link">
						Home
					</a>
				</li>
				<li>
					<a href="/about" className="navbar-link">
						About
					</a>
				</li>
				<li>
					<a href="/services" className="navbar-link">
						Services
					</a>
				</li>
				<li>
					<a href="/login" className="navbar-link">
						Login
					</a>
				</li>
			</ul>
			<div className="navbar-toggle" onClick={toggleNavbar}>
				<span className="navbar-toggle-icon"></span>
			</div>
		</nav>
	)
}
