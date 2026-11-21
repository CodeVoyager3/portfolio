import { ResumeUploadForm } from "@/components/admin/ResumeUploadForm"
import { getResumeMeta } from "@/lib/resume"

export const dynamic = 'force-dynamic';

export default async function AdminResumePage() {
    const meta = await getResumeMeta();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Resume</h1>
                <p className="text-muted-foreground">Upload the PDF served by the &quot;Resume / CV&quot; button on the site.</p>
            </div>
            <ResumeUploadForm initialMeta={meta} />
        </div>
    )
}
