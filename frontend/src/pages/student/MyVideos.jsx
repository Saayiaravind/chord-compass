import { Play } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getMyVideos } from '../../services/videoService';
import { extractYouTubeId, getYouTubeEmbedUrl } from '../../utils/youtubeUtils';

export default function MyVideos() {
  const { data: videos, loading } = useApiQuery(getMyVideos);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="My Videos" description="Videos assigned to you by your instructor" />

      {(!videos || videos.length === 0) ? (
        <EmptyState
          icon={Play}
          title="No videos yet"
          description="Videos assigned to you will appear here"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map(video => {
            const videoId = extractYouTubeId(video.youtubeUrl);
            const embedUrl = getYouTubeEmbedUrl(videoId);

            return (
              <Card key={video.id}>
                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                      Invalid video URL
                    </div>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-neutral-500 text-sm">{video.description}</p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
