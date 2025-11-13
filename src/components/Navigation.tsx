import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface NavigationProps {
  showBack?: boolean;
  showHome?: boolean;
  showBreadcrumbs?: boolean;
}

const routeLabels: Record<string, string> = {
  "/": "Start",
  "/onboarding": "Onboarding",
  "/home": "Home",
  "/help-request": "Hulp Vragen",
  "/matches": "Matches",
  "/sessions": "Sessies",
  "/library": "Bibliotheek",
  "/coach": "Coach Dashboard",
  "/community": "Community",
  "/portfolio": "Portfolio",
};

export const Navigation = ({
  showBack = true,
  showHome = true,
  showBreadcrumbs = true,
}: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ path: "/home", label: "Home" }];

    let currentPath = "";
    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment;
      if (currentPath !== "/home") {
        breadcrumbs.push({ path: currentPath, label });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const currentPage = breadcrumbs[breadcrumbs.length - 1];

  return (
    <div className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          {/* Breadcrumbs */}
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb className="flex-1">
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.path} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="font-semibold">
                          {crumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          onClick={() => navigate(crumb.path)}
                          className="cursor-pointer hover:text-peer-teal"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Home/Onboarding Button */}
          {showHome && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="shrink-0"
              title="Naar Home"
            >
              <Home className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
