import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import axiosInstance from "@/lib/axios";
import type { ListeningLessonDetailDTO } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import ScoreDialog from "@/components/listening/ScoreDialog";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface Props {
  listeningId: number;
  onBack: () => void;
}

const useQuizState = (totalQuestions: number) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setUserAnswers(prev => {
      const next = [...prev];
      next[currentQuestion] = idx;
      return next;
    });
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setUserAnswers(Array(totalQuestions).fill(null));
    setCurrentQuestion(0);
    setSelected(null);
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    console.log(userAnswers);
    console.log(questionIndex);

    setSelected(userAnswers[questionIndex]);
  };

  const getScore = (questions: Question[]) => {
    return userAnswers.filter((ans, idx) => ans === questions[idx].answer).length;
  };

  return {
    currentQuestion,
    selected,
    userAnswers,
    submitted,
    setSubmitted,
    handleSelect,
    resetQuiz,
    goToQuestion,
    getScore
  };
};

const ListeningDetail: React.FC<Props> = ({ listeningId, onBack }) => {
  const { data: lessonData, loading, error } = useApi<ListeningLessonDetailDTO>(
    () => axiosInstance.get(`/api/public/listening/lessons/${listeningId}`),
    [listeningId]
  );

  const questions: Question[] = Array.isArray(lessonData?.exercise) ? lessonData.exercise : [];
  const quiz = useQuizState(questions.length);
  const currentQuestion = questions[quiz.currentQuestion];
  const score = quiz.getScore(questions);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      quiz.resetQuiz();
    }
    // eslint-disable-next-line
  }, [questions.length]);

  // Update currentTime as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef]);

  // Find the active transcript line
  useEffect(() => {

    if (!lessonData?.transcript || !Array.isArray(lessonData.transcript)) return;
    let idx = -1;
    for (let i = 0; i < lessonData.transcript.length; i++) {
      if (currentTime >= lessonData.transcript[i].start) {
        idx = i;
      } else {
        break;
      }
    }
    setActiveLine(idx);
  }, [currentTime, lessonData?.transcript]);

  return (
    <div className="mx-auto my-6 p-2 md:p-4 bg-white rounded-2xl shadow flex flex-col md:flex-row gap-6 items-stretch min-h-[480px] md:min-h-[420px]">
      {/* Left Panel: Audio + Info + Transcript */}
      <div className="flex-1 flex flex-col gap-3 min-w-0 relative">
        <div className="rounded-xl bg-[#e0f7f5] p-4 flex flex-col gap-2 shadow-sm border border-[#02b2a4]/10">
          <div className="flex items-center justify-between mb-1 gap-2">
            <h2 className="text-xl font-bold text-[#02b2a4] truncate">{lessonData?.title}</h2>
            <Button
              className="rounded-full font-semibold px-4 py-1 shadow-md border border-[#02b2a4] text-xs ml-2 bg-[#e0f7f5] text-[#02b2a4] hover:bg-[#02b2a4] hover:text-white transition-colors"
              onClick={onBack}
            >
              &larr; Back to Exercises
            </Button>
          </div>
          <p className="text-gray-600 text-sm mb-2 truncate">{lessonData?.description}</p>
          <div className="rounded-lg overflow-hidden bg-white/80 shadow flex items-center px-2 py-2">
            <audio
              ref={audioRef}
              // src={lessonData.audioUrl}
              src='https://res.cloudinary.com/duzt2vlgh/video/upload/v1751357138/0L1-my-room_umfrcn.mp3'
              controls
              className="w-full h-10"
              style={{ backgroundColor: 'transparent', outline: 'none' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full font-semibold px-4 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#e0f7f5] text-[#02b2a4] hover:bg-[#02b2a4] hover:text-white transition-colors"
              onClick={() => setShowTranscript(prev => !prev)}
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </Button>
          </div>
          {showTranscript && (
            <div className="mt-2 bg-white rounded p-2 text-gray-800 border-l-4 border-[#02b2a4] text-xs max-h-32 overflow-auto">
              {lessonData?.transcript?.map((line, idx) => (
                <div
                  key={idx}
                  className={`py-1 px-2 rounded transition-all duration-200 ${idx === activeLine ? 'bg-[#02b2a4] text-white font-semibold' : ''}`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Right Panel: Quiz */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow p-4 border border-[#02b2a4]/10 min-w-0 max-h-[420px] overflow-auto relative">
        {quiz.submitted && (
          <ScoreDialog
            open={showScoreDialog}
            onOpenChange={setShowScoreDialog}
            score={score}
            total={questions.length}
            onReview={() => {
              setReviewMode(true);
              setShowScoreDialog(false);
            }}
            onBack={onBack}
          />
        )}
        <div className="flex items-center gap-2 text-xs mb-2">
          <span>Question {quiz.currentQuestion + 1} of {questions.length}</span>
          <span className="mx-2">&bull;</span>
          <span className="text-[#02b2a4]">{lessonData?.level}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded mb-3">
          <div
            className="h-2 rounded bg-[#02b2a4] transition-all"
            style={{ width: `${questions.length ? ((quiz.currentQuestion + 1) / questions.length) * 100 : 0}%`, minWidth: "32px", maxWidth: "100%" }}
          />
        </div>
        {questions.length > 0 ? (
          <>
            <h3 className="font-semibold text-base mb-3 text-[#02b2a4] truncate">
              {currentQuestion.question}
            </h3>
            <div className="space-y-2 mb-4">
              {currentQuestion.options.map((opt, idx) => {
                let style = "border-gray-300 bg-gray-50 text-gray-700 hover:border-[#02b2a4] hover:bg-[#f0fdfb] hover:text-[#02b2a4]";
                if (quiz.submitted) {
                  if (idx === currentQuestion.answer) {
                    style = "border-[#02b2a4] bg-[#e0f7f5] text-[#02b2a4] font-semibold";
                  }
                  if (quiz.userAnswers[quiz.currentQuestion] === idx && idx !== currentQuestion.answer) {
                    style = "border-red-400 bg-red-50 text-red-600 font-semibold";
                  }
                  if (quiz.userAnswers[quiz.currentQuestion] === idx && idx === currentQuestion.answer) {
                    style = "border-green-500 bg-green-50 text-green-700 font-semibold";
                  }
                } else if (quiz.selected === idx) {
                  style = "border-[#02b2a4] bg-[#02b2a4] text-white font-semibold shadow-md";
                }
                return (
                  <button
                    key={idx}
                    className={`w-full text-left px-3 py-2 rounded border text-xs transition-all duration-200 ${style}`}
                    onClick={() => !quiz.submitted && !reviewMode && quiz.handleSelect(idx)}
                    disabled={quiz.submitted || reviewMode}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                    {quiz.submitted && idx === currentQuestion.answer && (
                      <span className="ml-2 text-xs text-green-600 font-bold">(Correct)</span>
                    )}
                    {quiz.submitted && quiz.userAnswers[quiz.currentQuestion] === idx && idx !== currentQuestion.answer && (
                      <span className="ml-2 text-xs text-red-500">(Your answer)</span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 py-8">No quiz available for this lesson.</div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto pt-2">
          <div className="w-full sm:w-auto flex justify-start">
            {quiz.currentQuestion > 0 && (
              <Button
                variant="outline"
                className="rounded-full font-semibold px-5 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#e0f7f5] text-[#02b2a4] hover:bg-[#02b2a4] hover:text-white transition-colors h-9"
                onClick={() => quiz.goToQuestion(quiz.currentQuestion - 1)}
              >
                Previous
              </Button>
            )}
          </div>
          <div className="w-full sm:w-auto flex justify-end gap-2">
            {!quiz.submitted && quiz.currentQuestion === questions.length - 1 ? (
              <Button
                disabled={quiz.userAnswers[quiz.currentQuestion] === null || reviewMode}
                className="rounded-full font-semibold px-5 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#02b2a4] text-white hover:bg-[#029e93] transition-colors h-9"
                onClick={() => {
                  quiz.setSubmitted(true);
                  setShowScoreDialog(true);
                }}
              >
                Submit
              </Button>
            ) : !quiz.submitted ? (
              <Button
                disabled={quiz.userAnswers[quiz.currentQuestion] === null || reviewMode}
                className="rounded-full font-semibold px-5 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#02b2a4] text-white hover:bg-[#029e93] transition-colors h-9"
                onClick={() => quiz.goToQuestion(quiz.currentQuestion + 1)}
              >
                Next
              </Button>
            ) : quiz.currentQuestion < questions.length - 1 ? (
              <Button
                disabled={quiz.userAnswers[quiz.currentQuestion] === null || reviewMode}
                className="rounded-full font-semibold px-5 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#02b2a4] text-white hover:bg-[#029e93] transition-colors h-9"
                onClick={() => quiz.goToQuestion(quiz.currentQuestion + 1)}
              >
                Next
              </Button>
            ) : null}
            {quiz.submitted && !reviewMode && (
              <Button
                className="rounded-full font-semibold px-5 py-1 shadow-md border border-[#02b2a4] text-xs bg-[#e0f7f5] text-[#02b2a4] hover:bg-[#02b2a4] hover:text-white transition-colors h-9"
                onClick={() => {
                  quiz.resetQuiz();
                  setReviewMode(false);
                }}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningDetail;