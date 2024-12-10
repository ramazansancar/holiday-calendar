import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="fixed w-full bottom-0 bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                <p className="text-lg font-bold">Holiday Calendar</p>
                <p className="text-sm">© Tüm hakları saklıdır.</p>
                </div>
                <div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/home" className="cursor-pointer">
                            Anasayfa
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="cursor-pointer">
                            Hakkımızda
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="cursor-pointer">
                            İletişim
                        </Link>
                    </li>
                </ul>
                </div>
                <div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="https://www.facebook.com/" title="Facebook">
                            <Icon icon="ic:baseline-facebook" width="24" height="24" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" title="Facebook">
                            <Icon icon="mdi:instagram" width="24" height="24" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/" title="Linkedin">
                            <Icon icon="mdi:linkedin" width="24" height="24" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.github.com/" title="Github">
                            <Icon icon="foundation:social-github" width="24" height="24" />
                        </a>
                    </li>
                    {/* Diğer sosyal medya ikonları */}
                </ul>
                </div>
            </div>
        </footer>
    )
}