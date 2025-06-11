function SocialMedia() {
  const links = [
    {
      href: "",
      icon: "/assets/icons/social-media/YouTube.svg",
    },
    {
      href: "https://www.linkedin.com/in/sayan-edtech/",
      icon: "/assets/icons/social-media/LinkedIn.svg",
    },
    {
      href: "https://www.instagram.com/sayan_edtech/#",
      icon: "/assets/icons/social-media/Instagram.svg",
    },
    {
      href: "https://x.com/sayan_edtech",
      icon: "/assets/icons/social-media/Twitter.svg",
    },
    {
      href: "",
      icon: "/assets/icons/social-media/Facebook.svg",
    },
  ];
  return (
    <ul className="flex items-center flex-wrap gap-4">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            target="_blank"
            className="bg-[#1E02AA] hover:bg-[#009AFF] duration-200 transition-colors rounded-[8px] w-10  h-10 element-center"
          >
            <img
              src={link.icon}
              alt={link.href}
              className="w-5 h-5"
              loading="lazy"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialMedia;
