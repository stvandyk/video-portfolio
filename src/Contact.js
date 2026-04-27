import React, { useState, useEffect, useRef } from 'react';

const CONTACT_ENDPOINT = process.env.REACT_APP_CONTACT_API_URL || '/api/contact';
const RECIPIENT_EMAIL = 'bmj1015@gmail.com';

export function Contact({ selectedServices = [], onServicesChange, allServices = [] }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            onServicesChange(selectedServices.filter(s => s !== service));
        } else {
            onServicesChange([...selectedServices, service]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.website) return;

        setIsSending(true);
        setSendError('');

        const submission = {
            name: formData.name,
            email: formData.email,
            services: selectedServices.join(', ') || 'None selected',
            message: formData.message,
            website: formData.website,
        };

        try {
            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(submission),
            });

            const result = await response.json().catch(() => ({}));
            if (!response.ok || result.ok === false) {
                throw new Error(result.error || 'Failed to send contact form');
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '', website: '' });
            onServicesChange([]);
            setDropdownOpen(false);
        } catch (err) {
            setSendError(err.message || `Something went wrong. Please email ${RECIPIENT_EMAIL} directly.`);
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => setIsSubmitted(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const inputStyle = {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #5a5549',
        color: '#d4cfc4',
    };

    return (
        <div className="py-20 px-4 bg-gray-900 flex items-center justify-center">
            <div
                className="w-full max-w-lg p-10"
                style={{ border: '1px solid #5a5549' }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: '#d4cfc4' }}>
                    Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="absolute" style={{ left: '-9999px' }} aria-hidden="true">
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            tabIndex="-1"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="My name is..."
                            className="w-full py-3 focus:outline-none transition duration-300"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="My email is..."
                            className="w-full py-3 focus:outline-none transition duration-300"
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Services multi-select dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full py-3 text-left focus:outline-none transition duration-300 flex items-center justify-between"
                            style={inputStyle}
                        >
                            <span style={{ color: selectedServices.length > 0 ? '#d4cfc4' : '#7a756b' }}>
                                {selectedServices.length > 0
                                    ? selectedServices.join(', ')
                                    : "I'm interested in..."
                                }
                            </span>
                            <svg
                                className="w-4 h-4 flex-shrink-0 transition duration-200"
                                style={{ color: '#7a756b', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute left-0 right-0 mt-1 z-10 py-2"
                                style={{ backgroundColor: '#1f2937', border: '1px solid #5a5549' }}
                            >
                                {allServices.map((service) => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-gray-700 transition duration-200"
                                        style={{ color: '#d4cfc4' }}
                                    >
                                        <span
                                            className="w-4 h-4 flex-shrink-0 flex items-center justify-center"
                                            style={{ border: '1px solid #5a5549' }}
                                        >
                                            {selectedServices.includes(service) && (
                                                <svg className="w-3 h-3" style={{ color: '#6b8ea8' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            )}
                                        </span>
                                        {service}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="I'd like to chat about..."
                            className="w-full py-3 focus:outline-none transition duration-300 resize-none"
                            style={inputStyle}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="w-full font-semibold py-3 tracking-wide transition duration-300"
                        style={{
                            color: '#d4cfc4',
                            border: '1px solid #5a5549',
                            backgroundColor: 'transparent',
                            opacity: isSending ? 0.6 : 1,
                            cursor: isSending ? 'not-allowed' : 'pointer',
                        }}
                        onMouseEnter={e => { if (!isSending) e.currentTarget.style.backgroundColor = '#314d65'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </form>
                {isSubmitted && (
                    <p className="mt-6 text-center" style={{ color: '#8a9a5b' }}>
                        Thank you! Your message has been sent.
                    </p>
                )}
                {sendError && (
                    <p className="mt-6 text-center" style={{ color: '#c47a7a' }}>
                        {sendError}
                    </p>
                )}
            </div>
        </div>
    );
}
