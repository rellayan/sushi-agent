import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import ConnectionStatus from "./connection-status";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                {/* <img
                                    alt="sushi-icon"
                                    src="/sushi-icon.jpg"
                                    width="100%"
                                    height="100%"
                                    className="size-9"
                                /> */}

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-base">
                                        苏轼
                                    </span>
                                    {/* <span className="">v{info?.version}</span> */}
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <img
                                alt="sushi-full"
                                src="/sushi-full.jpg"
                                width="100%"
                                height="100%"
                                // className="size-7"
                            />
                            {/* <span className=""> image </span> */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <ConnectionStatus />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
