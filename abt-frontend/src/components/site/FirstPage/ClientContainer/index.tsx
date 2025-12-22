'use client'

import {advantagesList} from "@/lib/advantages-list"
import { motion } from "framer-motion";
import Image from "next/image"

interface Advantage {
    title: string;
    icon: string;
}

export default function ClientContainer() {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                advantagesList.map((advantage: Advantage, index) => (
                    <motion.div
                            initial={{y: 30, opacity:0}}
                            whileInView={{y:0, opacity:1}}
                            transition={{duration:0.5, delay: index * 0.2}}
                            viewport={{once: true}}
                        key={index}
                         className="flex flex-col items-center justify-center text-center
                         min-w-[250px] min-h-[175px] p-5 bg-white rounded-t-xl
                          hover:pt-10 duration-500
                         ">
                        <div className="bg-mainPurple rounded-full p-2 mb-2">
                            <Image src={`/advantages/${advantage.icon}.svg`} width={35} height={35}
                                   alt={advantage.title}/>
                        </div>
                        <p className="leading-tight">{advantage.title}</p>
                    </motion.div>
                ))
            }
        </div>
    )
}