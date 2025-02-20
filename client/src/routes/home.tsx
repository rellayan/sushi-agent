import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import Chat from "@/components/chat";

export default function Home() {
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000
    });

    const agents = query?.data?.agents;
    if (!agents) return <div></div>;

    const agent = agents[0];

    return (
        <Chat agentId={agent.id} />
    );
}
