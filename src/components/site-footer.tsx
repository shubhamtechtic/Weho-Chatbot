import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = [
    {
        title: "Why West Hollywood",
        links: [
            { label: "Economic Data", href: "#" },
            { label: "Available Properties", href: "#" },
        ]
    },
    {
        title: "Starting in WeHo",
        links: [
            { label: "Commercial Districts", href: "#" },
            { label: "Eastside", href: "#" },
            { label: "Design District", href: "#" },
            { label: "Mid City", href: "#" },
            { label: "Rainbow District", href: "#" },
            { label: "Sunset Strip", href: "#" },
            { label: "Business Incentives", href: "#" },
        ]
    },
    {
        title: "Existing Businesses",
        links: [
            { label: "Business Resources", href: "#" },
            { label: "Technical Assistance", href: "#" },
        ]
    },
    {
        title: "Success Stories",
        links: [
            { label: "Available properties", href: "#" },
            { label: "Special Events", href: "#" },
        ]
    },
];

export function SiteFooter() {
    return (
        <footer className="bg-muted/40 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    <div className="col-span-2 md:col-span-6 lg:col-span-1">
                        <Logo />
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h3 className="font-semibold mb-4">Contact us</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:email@example.com" className="text-muted-foreground hover:text-foreground">email@example.com</a></li>
                            <li><a href="tel:+15555555555" className="text-muted-foreground hover:text-foreground">+1 555 555 555</a></li>
                            <li className="text-muted-foreground">455 N State Street, <br/> Los Angeles</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
