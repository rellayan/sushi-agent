import { useQuery } from "@tanstack/react-query";
import info from "@/lib/info.json";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink, useLocation } from "react-router";
import type { UUID } from "@elizaos/core";
import { Book, Cog, User } from "lucide-react";
import ConnectionStatus from "./connection-status";

export function AppSidebar() {
    const location = useLocation();
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000,
    });

    const agents = query?.data?.agents;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                <img
                                    alt="sushi-icon"
                                    src="/sushi-icon.jpg"
                                    width="100%"
                                    height="100%"
                                    className="size-7"
                                />

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
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
