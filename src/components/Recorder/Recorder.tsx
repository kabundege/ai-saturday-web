import React, { useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { RiMic2Line } from "react-icons/ri";
import { IoIosAttach } from "react-icons/io";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { PiArrowElbowLeftDownDuotone } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { useFormik } from "formik";

const Recorder = () => {
  const { theme } = useTheme();
  const [response, setResponse] = React.useState<{
    sentiment: string;
    success: boolean;
    message: string;
  }>();
  const formik = useFormik({
    initialValues: {
      file: {} as Blob,
    },
    onSubmit: (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", values.file, "recording.wav");
      fetch("https://00f3-105-179-6-14.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
        })
        .catch(() => toast.error("An error occured"));
    },
  });
  const [dimensions, setDimensions] = React.useState({
    width: 500,
    height: 75,
  });
  const [isLoading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    startRecording,
    stopRecording,
    mediaRecorder,
    recordingBlob,
    isRecording,
  } = useAudioRecorder();

  useEffect(() => {
    const bounds = inputRef.current?.getBoundingClientRect();
    /**
     * #TODO
     * Calculate the dimensions of the audio visualizer
     * based on the width and height of the input element
     * and set the dimensions of the audio visualizer
     */
    if (bounds)
      setDimensions({
        width: bounds.width * 1.46,
        height: bounds.height * 1.5,
      });
  }, [inputRef]);

  const handleSubmit = () => {
    let file: Blob | null = null;
    /**
     * #TODO
     * If the user has uploaded a file, use that file
     * else if the user has recorded a file, use that file
     */
    if (recordingBlob) {
      file = recordingBlob;
    }

    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file, "recording.wav");
      fetch("https://00f3-105-179-6-14.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
        })
        .catch(() => toast.error("An error occured"));
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto ">
      {response ? (
        <AnimatePresence>
          <motion.div
            initial={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 20, opacity: 0 }}
            transition={{
              type: "spring",
            }}
            className="bg-white p-6 border mx-0 shadow-lg mb-10 rounded-2xl"
          >
            <p className="text-default-600">
              Below is the result from response the robust {"model's"}{" "}
              predictions from the model based on the provided audio input.
            </p>

            <div className="mt-3 flex items-center gap-5">
              <PiArrowElbowLeftDownDuotone />
              <div>
                <p
                  className={`font-bold ${
                    response.sentiment === "negative"
                      ? "text-red-600"
                      : "text-green"
                  } text-lg`}
                >
                  {response.sentiment}
                </p>
                <p className="text-default-400 text-sm">Sentiment</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : null}
      <div className="flex items-center gap-3">
        {isRecording && mediaRecorder ? (
          <LiveAudioVisualizer
            barColor={theme === "light" ? "#111" : "#fff"}
            mediaRecorder={mediaRecorder}
            height={dimensions.height}
            width={dimensions.width}
            barWidth={5}
            gap={3}
          />
        ) : recordingBlob ? (
          <AudioVisualizer
            gap={2}
            barWidth={5}
            blob={recordingBlob}
            width={dimensions.width}
            height={dimensions.height}
            barColor={theme === "light" ? "#111" : "#fff"}
          />
        ) : (
          <Input
            type="file"
            name="file"
            ref={inputRef}
            accept="audio/*"
            onChange={formik.handleChange}
            className="text-default-100"
            placeholder="Upload or record an audio here ..."
            endContent={
              <Button
                isLoading={isLoading}
                onPress={handleSubmit}
                className="my-1 rounded-full  font-medium"
                endContent={<HiOutlineArrowUpRight style={{ fontSize: 32 }} />}
              >
                Send
              </Button>
            }
            classNames={{
              inputWrapper: "h-14 p-2 rounded-full border shadow-sm !bg-white",
            }}
            startContent={
              <Button
                isIconOnly
                className="rounded-full bg-default-900 text-default-100"
                onPress={() => {
                  inputRef.current?.click();
                }}
                endContent={<IoIosAttach style={{ fontSize: 18 }} />}
              />
            }
          />
        )}

        <Button
          isIconOnly
          onPress={() => {
            if (isRecording) {
              stopRecording();
            } else {
              startRecording();
            }
          }}
          className="rounded-full border shadow-sm h-12 w-14 bg-default-900 text-default-100"
          endContent={<RiMic2Line style={{ fontSize: 20 }} />}
        />
        {recordingBlob ? (
          <Button
            isIconOnly
            color="success"
            onPress={handleSubmit}
            endContent={<HiOutlineArrowUpRight />}
            className="my-1 rounded-full font-medium"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Recorder;
