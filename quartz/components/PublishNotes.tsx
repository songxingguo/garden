import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/publishNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { htmlToJsx } from "../util/jsx"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const PublishNotes: QuartzComponent = ({
    allFiles,
    fileData,
    tree,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    console.log("fileData", fileData)
    return (
      <div class={classNames(displayClass, "publish-notes")}>
        {/* <h3>{opts.title ?? i18n(cfg.locale).components.PublishNotes.title}</h3> */}
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            const content = htmlToJsx(fileData.filePath!, tree)
            // console.log("content", content)
            return (
              <li class="recent-li">
                <article class="heti">
                  <div>
                    <h3 class="post-title!">
                      <a href={resolveRelative(fileData.slug!, page.slug!)}>{title}</a>
                    </h3>
                    <div class="mt-2 text-3.5">
                      <span>发布于 </span>
                      {page.dates && (
                        <time>
                          <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                        </time>
                      )}

                      {tags.map((tag) => (
                        <a
                          class="ml-2.5"
                          href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                        >
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                  <p class="line-clamp-4">{/* <a>{content}</a> */}</p>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  PublishNotes.css = style
  return PublishNotes
}) satisfies QuartzComponentConstructor
