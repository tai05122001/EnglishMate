// This file is generated. DO NOT EDIT MANUALLY.
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import Button from "@/components/common/Button";
import { Smile, Meh, Frown } from "lucide-react";

interface ScoreDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    score: number;
    total: number;
    onReview: () => void;
    onBack: () => void;
}

const getEmotion = (score: number, total: number) => {
    if (total === 0) return { icon: <Meh size={48} className="text-gray-400 mx-auto" />, color: "text-gray-400", label: "No Questions" };
    const percent = score / total;
    if (percent >= 0.8) {
        return { icon: <Smile size={48} className="text-[#22c55e] mx-auto" />, color: "text-[#22c55e]", label: "Great Job!" };
    } else if (percent >= 0.5) {
        return { icon: <Meh size={48} className="text-[#eab308] mx-auto" />, color: "text-[#eab308]", label: "Not Bad!" };
    } else {
        return { icon: <Frown size={48} className="text-[#ef4444] mx-auto" />, color: "text-[#ef4444]", label: "Keep Practicing!" };
    }
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({ open, onOpenChange, score, total, onReview, onBack }) => {
    const emotion = getEmotion(score, total);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xs text-center p-6">
                <div className="flex flex-col items-center gap-2">
                    {emotion.icon}
                    <DialogTitle className={`mt-2 text-2xl font-bold ${emotion.color}`}>{emotion.label}</DialogTitle>
                    <DialogDescription className="text-base mt-1 mb-2 text-gray-700">
                        You answered <span className="font-semibold text-[#02b2a4]">{score}</span> out of <span className="font-semibold text-[#02b2a4]">{total}</span> questions correctly!
                    </DialogDescription>
                </div>
                <DialogFooter className="flex flex-col gap-2 mt-4">
                    <Button
                        className="rounded-full font-semibold px-5 py-2 shadow-md border border-[#02b2a4] text-sm bg-[#02b2a4] text-white hover:bg-[#029e93] transition-colors"
                        onClick={() => {
                            onOpenChange(false);
                            onReview();
                        }}
                    >
                        Review
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-full font-semibold px-5 py-2 shadow-md border border-[#02b2a4] text-sm bg-[#e0f7f5] text-[#02b2a4] hover:bg-[#02b2a4] hover:text-white transition-colors"
                            onClick={onBack}
                        >
                            Back to Exercises
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ScoreDialog; 