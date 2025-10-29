import { Link, useLocation } from "wouter";
import { GraduationCap, BookPlus, Tags } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Practice", icon: GraduationCap },
    { href: "/add-words", label: "Add Words", icon: BookPlus },
    { href: "/manage-tags", label: "Manage Tags", icon: Tags },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">Language Practice</span>
          </div>

          <div className="flex gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;

              return (
                <Link key={link.href} href={link.href}>
                  <div
                    data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer
                      ${isActive
                        ? "bg-gray-300 text-primary-foreground"
                        : "text-muted-foreground hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
