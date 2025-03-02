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
    useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import ConnectionStatus from "./connection-status";
import { useEffect, useState } from "react";

const SUSHI_VIDEO_URL = "https://p2-kling.klingai.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_272874278140611/-883994732104358824/output.mp4";
const SUSHI_DEFAULT_IMAGE = "/sushi-full.png";

function getRandomFrame(videoElement: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');

    const randomTime = Math.random() * videoElement.duration;
    videoElement.currentTime = randomTime;

    return new Promise((resolve) => {
        videoElement.addEventListener('seeked', () => {
            if (ctx) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                resolve(dataUrl);
            }
        }, { once: true });
    });
}

export function AppSidebar() {
    const { imageFrame, isVideoPlaying } = useSidebar();
    const [imgSrc, setImgSrc] = useState(SUSHI_DEFAULT_IMAGE);

    useEffect(() => {
        // playing video on user click chat input
        const video = document.getElementById('sushi-video') as HTMLVideoElement;
        if (isVideoPlaying) {
            video.play().catch(console.error);
        }
    }, [isVideoPlaying])

    useEffect(() => {
        // update image frame
        if (imageFrame > 0) {
            const video = document.getElementById('sushi-video') as HTMLVideoElement;
            getRandomFrame(video).then(setImgSrc);
        }
    }, [imageFrame])

    const showVideo = imageFrame === 0;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                {/* <img
                                    alt="sushi-icon"
                                    src="/sushi-icon.png"
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
                            <video
                                id="sushi-video"
                                width="100%"
                                height="100%"
                                controlsList="nodownload"
                                crossOrigin="anonymous"
                                poster={SUSHI_DEFAULT_IMAGE}
                                style={{ display: showVideo ? "block" : "none"}}>
                                    <source src={SUSHI_VIDEO_URL} type="video/mp4" />
                                    浏览器不支持视频播放
                            </video>
                            <img
                                alt="sushi-full"
                                src={imgSrc}
                                width="100%"
                                height="100%"
                                style={{ display: !showVideo ? "block" : "none"}}
                            />
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
