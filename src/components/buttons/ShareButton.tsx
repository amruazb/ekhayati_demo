"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IconShare } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";

export const ShareButton = (props: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const router = useRouter();
  const t = useTranslations("shop");

  const title = props.title;

  useEffect(() => {
    if (window !== undefined) {
        setShareUrl(window.location.href);
    }
  }, [])

  const handleShare = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        className="bg-primary-700 mx-4 text-orange-900 font-bold min-w-0 min-h-0 h-auto p-[7px] py-[8px] rounded-[10px]"
        isIconOnly
        onClick={handleShare}
      >
        <IconShare className="w-auto min-w-0" size={18} />
      </Button>

      <Modal isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <ModalContent>
          <ModalHeader>{t("share")}</ModalHeader>
          <ModalBody className="flex w-full flex-wrap flex-row justify-start items-start">
            <div className="Demo__some-network">
              <FacebookShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="Demo__some-network">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="Demo__some-network">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <XIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="Demo__some-network">
              <TelegramShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="Demo__some-network">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="Demo__some-network">
              <LinkedinShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className="Demo__some-network">
              <PinterestShareButton
                url={shareUrl}
                media={props?.imageUrl}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="Demo__some-network">
              <VKShareButton
                url={shareUrl}
                image={props.imageUrl}
                className="Demo__some-network__share-button"
              >
                <VKIcon size={32} round />
              </VKShareButton>
            </div>

            <div className="Demo__some-network">
              <OKShareButton
                url={shareUrl}
                image={props?.imageUrl}
                className="Demo__some-network__share-button"
              >
                <OKIcon size={32} round />
              </OKShareButton>
            </div>

            <div className="Demo__some-network">
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className="Demo__some-network">
              <GabShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={640}
                className="Demo__some-network__share-button"
              >
                <GabIcon size={32} round />
              </GabShareButton>
            </div>

            <div className="Demo__some-network">
              <TumblrShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>
            </div>

            <div className="Demo__some-network">
              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>
            </div>

            <div className="Demo__some-network">
              <MailruShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <MailruIcon size={32} round />
              </MailruShareButton>
            </div>

            <div className="Demo__some-network">
              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>

            <div className="Demo__some-network">
              <ViberShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className="Demo__some-network">
              <WorkplaceShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <WorkplaceIcon size={32} round />
              </WorkplaceShareButton>
            </div>

            <div className="Demo__some-network">
              <LineShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <LineIcon size={32} round />
              </LineShareButton>
            </div>

            <div className="Demo__some-network">
              <WeiboShareButton
                url={shareUrl}
                title={title}
                image={props.imageUrl}
                className="Demo__some-network__share-button"
              >
                <WeiboIcon size={32} round />
              </WeiboShareButton>
            </div>

            <div className="Demo__some-network">
              <PocketShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <PocketIcon size={32} round />
              </PocketShareButton>
            </div>

            <div className="Demo__some-network">
              <InstapaperShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <InstapaperIcon size={32} round />
              </InstapaperShareButton>
            </div>

            <div className="Demo__some-network">
              <HatenaShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <HatenaIcon size={32} round />
              </HatenaShareButton>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
