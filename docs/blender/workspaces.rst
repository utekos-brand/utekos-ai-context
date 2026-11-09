
************************
Video Editing Workspaces
************************

Blender provides several workspaces for different stages of the video editing workflow.
These workspaces arrange the relevant editors for sequencing footage, compositing effects,
and rendering the final result.


Compositing
===========

.. figure:: /images/video-editing_workspaces_compositing.png
   :align: center
   :alt: Compositing workspace.

   The Compositing workspace.

The *Compositing* workspace is intended for creating procedural effects for video sequences
using the :doc:`Compositor </compositing/index>`.

It provides a node-based workflow for processing the output of the
:doc:`Video Sequencer </video_editing/index>`, allowing effects such as color adjustments,
blurs, masks, and other image processing operations to be applied to the sequence.

See the :doc:`Compositor Strip </video_editing/edit/montage/strips/compositor>` and the
:doc:`Compositor Modifier </video_editing/edit/montage/modifiers/compositor>` for more information
about using the Compositor with the Video Sequencer.


Rendering
=========

.. figure:: /images/video-editing_workspaces_rendering.png
   :align: center
   :alt: Rendering workspace.

   The Rendering workspace.

The *Rendering* workspace is intended for previewing and rendering the final video sequence.

It provides access to the rendered result and output settings used when exporting the sequence.
Before rendering, configure the output resolution, frame range, file format, encoding,
and output path in the :doc:`Output Properties </render/output/properties/index>`.

See :doc:`/render/output/animation` for information about rendering animations and video files.


Video Editing
=============

.. figure:: /images/video-editing_workspaces_video-editing.png
   :align: center
   :alt: Video Editing workspace.

   The Video Editing workspace.

The *Video Editing* workspace is the main workspace for assembling and editing a video sequence.

It contains the :doc:`Video Sequencer </video_editing/index>` for arranging video, image,
audio, and effect strips along the timeline, together with a preview for viewing the result.

This workspace is typically used for tasks such as trimming and moving strips,
adjusting timing, adding transitions and effects, mixing audio, and organizing the overall edit.
