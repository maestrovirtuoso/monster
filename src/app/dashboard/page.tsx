import { AppSidebar } from "@/components/app-sidebar";
import Map1 from "@/components/Map-components/Map1";
import Map2 from "@/components/Map-components/MapZoom";
import Map3 from "@/components/Map-components/Map3";
import Map4 from "@/components/Map-components/Map4";
import Map from "@/components/Map-components/Map";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-full"> {/* SidebarInset occupe toute la hauteur */}
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-50 px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-sm text-gray-600">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-800">
                    Data Fetching
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Conteneur de la carte */}
        <div className="w-full h-screen"> {/* Assurez-vous que la carte occupe toute la hauteur */}
       
      
        <Map1/>
       

     
   
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
