// import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/solid';
import { PencilIcon } from "@heroicons/react/24/solid";

type IconLinkProps = {
  to: string;
  icon: string;
};

export function IconLink({ to, icon }: IconLinkProps) {
  return (
    <Link to={to} className="hover:text-amber-600 duration-100 transition-colors">
      {(() => {
        switch (icon) {
          case 'edit':
            return <PencilIcon className="size-6" />;
          case 'lineup':
            return <Bars4Icon className="size-6 rotate-90 origin-center" />;
          case 'heart':
            return <HeartIcon className="size-6" />;
          case 'post':
            return <ChatBubbleOvalLeftIcon className="size-6" />;
          default:
            return <Bars4Icon className="size-6" />;
        }
      })()}
    </Link>
  );
}
